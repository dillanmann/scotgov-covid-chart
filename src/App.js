import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ApolloProvider, Query } from 'react-apollo';
import client from './apollo';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GitHubIcon from '@material-ui/icons/GitHub';
import randomcolor from 'randomcolor';
import { GET_DATASETS, ORDERBY_DATE_ASC } from './queries/GetDatasets'

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

const labels = {
  "total_tests": "Total Tests",
  "total_deaths": "Total Deaths",
  "positive_tests": "Positive Tests",
  "negative_tests": "Negative Tests",
  "ayrshireandarran_cases": "Ayrshire and Arran Cases",
  "borders_cases": "Borders Cases",
  "dumfriesandgalloway_cases": "Dumfries and Galloway Cases",
  "fife_cases": "Fife Cases",
  "forthvalley_cases": "Forth Valley Cases",
  "grampian_cases": "Grampian Cases",
  "greaterglasgowandclyde_cases": "Greater Glasgow and Clyde Cases",
  "highland_cases": "Highland Cases",
  "lanarkshire_cases": "Lanarkshire Cases",
  "lothian_cases": "Lothian Cases",
  "orkney_cases": "Orkney Cases",
  "shetland_cases": "Shetland Cases",
  "tayside_cases": "Tayside Cases"
};

const colors = availableLines.reduce((map, obj) => {
  map[obj] = randomcolor({ luminosity: 'light' });
  return map;
}, {});

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

  selectAllChannels(value) {
    this.setState(Object.keys(this.state).reduce((p, c) => ({ ...p, [c]: value }), {}));
  }

  transformChartData(data) {
    let chartData = [];
    data.datasets.nodes.forEach((set, _) => {
      let dataset = {
        date: set.date.split("T")[0],
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
                <Paper style={{ marginLeft: 30 }}>
                  <Typography variant="h6" style={{ textAlign: "center", margin: 5 }}>Data Channels</Typography>
                  <FormGroup style={{ padding: 5 }}>
                    {availableLines.map(line =>
                      (
                        <FormControlLabel
                          control={<Checkbox checked={this.state[line + "_enabled"]} onChange={this.handleChange} name={line + "_enabled"} />}
                          label={labels[line]}
                          key={line}
                        />
                      ))}
                    <ButtonGroup variant="contained" color="primary" style={{ width: "100%" }}>
                      <Button onClick={() => this.selectAllChannels(true)} style={{ width: "100%" }}>Select all</Button>
                      <Button onClick={() => this.selectAllChannels(false)} style={{ width: "100%" }}>Deselect all</Button>
                    </ButtonGroup>
                  </FormGroup>
                </Paper>
              </Grid>
              <Grid item sm={10}>
                <ResponsiveContainer>
                  <LineChart data={this.transformChartData(data)} margin={{ top: 5, right: 30, bottom: 5 }}>
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip contentStyle={{ background: '#424242' }} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    {availableLines
                      .filter(line => this.state[line + "_enabled"] === true)
                      .map(line =>
                        (
                          <Line type="monotone" dataKey={line} name={labels[line]} stroke={colors[line]} key={line} />
                        ))}
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item sm={12}>
                <BottomNavigation style={{ width: '100%', position: 'fixed', bottom: 0}}>
                  <BottomNavigationAction icon={<GitHubIcon />} href="https://github.com/dillanmann/scotgov-covid-chart"></BottomNavigationAction>
                </BottomNavigation>
              </Grid>
            </Grid>
          )}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
