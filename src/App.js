import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ApolloProvider, Query } from 'react-apollo';
import client from './apollo';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { GET_DATASETS, ORDERBY_DATE_ASC } from './queries/GetDatasets'
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import randomcolor from 'randomcolor';

const availableLines = [
  "total_tests",
  "total_deaths",
  "positive_tests",
  "negative_tests",
  "ayrshireandarran_cases",
  "borders_cases",
  "dumfriesandgalloway_cases",
  "fife_cases",
  "forthvalley_cases",
  "grampian_cases",
  "greaterglasgowandclyde_cases",
  "highland_cases",
  "lanarkshire_cases",
  "lothian_cases",
  "orkney_cases",
  "shetland_cases",
  "tayside_cases"
]

class App extends React.Component {

  constructor(props) {
    super(props);

    // build state checkbox items out of the available data
    this.state = availableLines.reduce((map, obj) => {
      var key = obj + "_enabled";
      map[key] = false;
      return map;
    }, {});
  }

  transformChartData(data) {
    let chartData = [];
    data.datasets.nodes.forEach((set, _) => {
      let dataset = {
        name: set.date.split("T")[0],
        total_deaths: set.totalDeaths,
        total_tests: set.totalTests,
        positive_tests: set.positiveTests,
        negative_tests: set.negativeTests,
        ayrshireandarran_cases: set.ayrshireandarranCases,
        borders_cases: set.bordersCases,
        dumfriesandgalloway_cases: set.dumfriesandgallowayCases,
        fife_cases: set.dumfriesandgallowayCases,
        forthvalley_cases: set.forthvalleyCases,
        grampian_cases: set.grampianCases,
        greaterglasgowandclyde_cases: set.greaterglasgowandclydeCases,
        highland_cases: set.highlandCases,
        lanarkshire_cases: set.lanarkshireCases,
        lothian_cases: set.lothianCases,
        orkney_cases: set.orkneyCases,
        shetland_cases: set.shetlandCases,
        tayside_cases: set.taysideCases,
      }
      chartData.push(dataset);
    })
    return chartData;
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GET_DATASETS} variables={ORDERBY_DATE_ASC}>
          {({ loading, data, refetch }) => !loading && (
            <Grid container>
              <Grid item sm={12} style={{ textAlign: "center", margin: 5 }}>
                <Typography variant="h3">ScotGov COVID-19 Data</Typography>
              </Grid>
              <Grid item sm={2}>
                <FormGroup style={{ marginLeft: 10 }}>
                  {availableLines.map(line =>
                    (
                      <FormControlLabel
                        control={<Checkbox checked={this.state[line + "_enabled"]} onChange={this.handleChange} name={line + "_enabled"} />}
                        label={line.replace('_', ' ')}
                        key={line}
                      />
                    ))}
                </FormGroup>
              </Grid>
              <Grid item sm={10}>
                <div style={{
                  paddingBottom: '56.25%', /* 16:9 */
                  position: 'relative',
                  height: 0
                }} >
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%'
                  }}>
                    <ResponsiveContainer width="90%" height="80%">
                      <LineChart data={this.transformChartData(data)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <XAxis dataKey="name" />
                        <YAxis />
                        {availableLines
                          .filter(line => this.state[line + "_enabled"] === true)
                          .map(line =>
                            (
                              <Line type="monotone" dataKey={line} stroke={randomcolor()} key={line} />
                            ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
            </Grid>
          )}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
