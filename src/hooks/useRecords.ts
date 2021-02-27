import { graphql, useStaticQuery } from 'gatsby';

export function useRecords(): Record<string, string[]> {
  const { allRecordsYaml } = useStaticQuery(
    graphql`
      query {
        allRecordsYaml {
          edges {
            node {
              type
              content
            }
          }
        }
      }
    `,
  );

  const edges: any[] = allRecordsYaml?.edges ?? [];
  const nodes: [string, string][] = edges.map(edge => [
    edge?.node?.type ?? '',
    edge?.node?.content ?? '',
  ]);

  const recordsObject = Object.fromEntries(
    nodes
      .filter(([type]) => !!type)
      .map(([type, content]) => [type, content.split('---').map(message => message.trim())]),
  );

  return recordsObject;
}
