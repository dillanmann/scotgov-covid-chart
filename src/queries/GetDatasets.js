import gql from 'graphql-tag';

export const GET_DATASETS = gql`query GetDatasets($scrapedOrder: ScrapedDataSort!, $calculatedOrder: CalculatedDataSort!){
  scrapedDatasets(order_by: $scrapedOrder)
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
    calculatedDatasets(order_by: $calculatedOrder){
      nodes{
        date,
        dailyDeaths
      }
    }
    
  }`;

export const ORDERBY_DATE_ASC = {"scrapedOrder": {"date": "ASC" }, "calculatedOrder": {"date": "ASC" }};