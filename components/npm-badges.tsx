interface NpmBadgesProps {
  packageName: string;
  className?: string;
  showWeekly?: boolean;
  showMonthly?: boolean;
  showTotal?: boolean;
  showVersion?: boolean;
  style?: 'badgen' | 'shields';
}

export default function NpmBadges({
  packageName,
  className = '',
  showWeekly = true,
  showMonthly = true,
  showTotal = true,
  showVersion = true,
  style = 'badgen',
}: NpmBadgesProps) {
  const baseUrl =
    style === 'badgen' ? 'https://badgen.net' : 'https://img.shields.io';

  const badges = [];

  if (showVersion) {
    badges.push(
      <a
        key="version"
        href={`https://www.npmjs.com/package/${packageName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src={`${baseUrl}/npm/v/${packageName}`}
          alt="npm version"
          className="h-6"
        />
      </a>
    );
  }

  if (showWeekly) {
    badges.push(
      <a
        key="weekly"
        href={`https://www.npmjs.com/package/${packageName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src={`${baseUrl}/npm/dw/${packageName}`}
          alt="weekly downloads"
          className="h-6"
        />
      </a>
    );
  }

  if (showMonthly) {
    badges.push(
      <a
        key="monthly"
        href={`https://www.npmjs.com/package/${packageName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src={`${baseUrl}/npm/dm/${packageName}`}
          alt="monthly downloads"
          className="h-6"
        />
      </a>
    );
  }

  if (showTotal) {
    badges.push(
      <a
        key="total"
        href={`https://www.npmjs.com/package/${packageName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src={`${baseUrl}/npm/dt/${packageName}`}
          alt="total downloads"
          className="h-6"
        />
      </a>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>{badges}</div>
  );
}
