import { Match } from '@/types';
import styles from './MatchRow.module.css';

interface MatchRowProps {
  match: Match;
}

const MatchRow = ({ match }: MatchRowProps) => {
  // Форматирование даты и времени
  const formatDate = (utcDate: string) => {
    const date = new Date(utcDate);
    return {
      date: date.toLocaleDateString('ru-RU'),
      time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  // Мапер статуса на русском
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      SCHEDULED: 'Запланирован',
      LIVE: 'В прямом эфире',
      IN_PLAY: 'Идет',
      PAUSED: 'Перерыв',
      FINISHED: 'Завершен',
      POSTPONED: 'Отложен',
      CANCELLED: 'Отменен',
      TIMED: 'Запланирован',
    };
    return statusMap[status] || status;
  };

  // Форматирование счета по ТЗ: X:Y (Z:G) (N:M)
  const formatScore = (match: Match) => {
    const fullTime = match.score.fullTime; // X:Y (всегда есть)
    const extraTime = match.score.extraTime; // Z:G (есть только в платном API)
    const penalties = match.score.penalties; // N:M (есть только в платном API)

    let scoreText = '';

    // Основное время X:Y
    if (fullTime.home !== null && fullTime.away !== null) {
      scoreText = `${fullTime.home}:${fullTime.away}`;
    } else {
      scoreText = '?:?';
    }

    // Дополнительное время (Z:G) — если есть в ответе
    if (extraTime && extraTime.home !== null && extraTime.away !== null) {
      scoreText += ` (${extraTime.home}:${extraTime.away})`;
    }

    // Пенальти (N:M) — если есть в ответе
    if (penalties && penalties.home !== null && penalties.away !== null) {
      scoreText += ` (${penalties.home}:${penalties.away})`;
    }

    return scoreText;
  };

  const { date, time } = formatDate(match.utcDate);

  return (
    <div className={styles.matchRow}>
      <div className={styles.matchLeft}>
        <div className={styles.dateTime}>
          <span className={styles.date}>{date}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.status}>{getStatusText(match.status)}</div>
        <div className={styles.teams}>
          <span className={styles.homeTeam}>{match.homeTeam.name}</span>
          <span className={styles.dash}>—</span>
          <span className={styles.awayTeam}>{match.awayTeam.name}</span>
        </div>
      </div>

      <div className={styles.score}>{formatScore(match)}</div>
    </div>
  );
};

export default MatchRow;
