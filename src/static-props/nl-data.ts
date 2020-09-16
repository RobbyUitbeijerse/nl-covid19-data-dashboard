import fs from 'fs';
import path from 'path';

import { National } from 'types/data.d';

export interface INationalData {
  data: National;
  lastGenerated: string;
}

interface IProps {
  props: INationalData;
}

/*
 * getNlData loads the data for /landelijk pages.
 * It needs to be used as the Next.js `getStaticProps` function.
 *
 * Example:
 * ```ts
 * PostivelyTestedPeople.getLayout = getNationalLayout();
 *
 * export const getStaticProps = getNlData();
 *
 * export default PostivelyTestedPeople;
 * ```
 *
 * The `INationalData` should be used in conjuction with `FCWithLayout`
 *
 * Example:
 * ```ts
 * const PostivelyTestedPeople: FCWithLayout<INationalData> = props => {
 *   // ...
 * }
 * ```
 */
export default function getNlData(): () => IProps {
  return async function () {
    let nlData;

    const filePath = path.join(process.cwd(), 'public', 'json', 'NL.json');
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      nlData = JSON.parse(fileContents) as National;
    } else {
      const res = await fetch(
        'https://coronadashboard.rijksoverheid.nl/json/NL.json'
      );
      nlData = await res.json();
    }

    const lastGenerated = nlData.last_generated;

    return {
      props: {
        data: nlData,
        lastGenerated,
      },
    };
  };
}
