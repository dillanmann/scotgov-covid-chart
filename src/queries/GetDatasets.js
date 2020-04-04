import gql from 'graphql-tag';

export const GET_DATASETS = gql`query GetDatasets($order: DatasetsSort!){
    datasets(order_by: $order)
    {
      nodes{
        date,
        totalTests,
        totalDeaths,
        positiveTests,
        negativeTests,
          ayrshireandarranCases,
          bordersCases,
          dumfriesandgallowayCases,
          fifeCases,
          forthvalleyCases,
          grampianCases,
          greaterglasgowandclydeCases,
          highlandCases,
          lanarkshireCases,
          lothianCases,
          orkneyCases,
          shetlandCases,
          taysideCases
      }
    }
  }`;

export const ORDERBY_DATE_ASC = {"order": {"date": "ASC" }};