import siteText from 'locale';

import styles from './metadata.module.scss';

import ClockIcon from 'assets/clock.svg';
import DatabaseIcon from 'assets/database.svg';

import replaceVariablesInText from 'utils/replaceVariablesInText';
import formatDate from 'utils/formatDate';

interface IProps {
  dataSource: {
    href: string;
    text: string;
  };
  dateUnix?: number;
  dateInsertedUnix?: number;
  datumsText: string;
}

const text: typeof siteText.common.metadata = siteText.common.metadata;

export default Metadata;

function Metadata(props: IProps) {
  const { dataSource, datumsText, dateUnix, dateInsertedUnix } = props;

  if (!dateUnix) return null;

  const dateOfReport = formatDate(dateUnix * 1000, 'relative');
  const dateOfInsertion = dateInsertedUnix
    ? formatDate(dateInsertedUnix * 1000, 'relative')
    : undefined;

  return (
    <div>
      <div className={styles.item}>
        <span>
          <ClockIcon aria-hidden />
        </span>
        <p>
          {replaceVariablesInText(datumsText, {
            dateOfReport,
            dateOfInsertion,
          })}
        </p>
      </div>

      <div className={styles.item}>
        <span>
          <DatabaseIcon aria-hidden />
        </span>
        <p>
          {text.source}:{' '}
          <a href={dataSource.href} rel="noopener noreferrer">
            {dataSource.text}
          </a>
        </p>
      </div>
    </div>
  );
}
