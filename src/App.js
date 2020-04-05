import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ApolloProvider, Query } from 'react-apollo';
import client from './apollo';
import {
  FormControlLabel, FormGroup, Checkbox, Grid, Typography, Paper, Button, ButtonGroup,
  BottomNavigation, BottomNavigationAction, Radio, RadioGroup, FormLabel
} from '@material-ui/core';
import { GitHub, Twitter } from '@material-ui/icons';
import randomcolor from 'randomcolor';
import { GET_DATASETS, ORDERBY_DATE_ASC } from './queries/GetDatasets'

const allDataChannels = [
  "totalTests",
  "totalDeaths",
  "positiveTests",
  "negativeTests",
  "ayrshireandarranCases",
  "bordersCases",
  "dumfriesandgallowayCases",
  "fifeCases",
  "forthvalleyCases",
  "grampianCases",
  "greaterglasgowandclydeCases",
  "highlandCases",
  "lanarkshireCases",
  "lothianCases",
  "orkneyCases",
  "shetlandCases",
  "taysideCases"
]

const labels = {
  "totalTests": "Total Tests",
  "totalDeaths": "Total Deaths",
  "positiveTests": "Positive Tests",
  "negativeTests": "Negative Tests",
  "ayrshireandarranCases": "Ayrshire and Arran Cases",
  "bordersCases": "Borders Cases",
  "dumfriesandgallowayCases": "Dumfries and Galloway Cases",
  "fifeCases": "Fife Cases",
  "forthvalleyCases": "Forth Valley Cases",
  "grampianCases": "Grampian Cases",
  "greaterglasgowandclydeCases": "Greater Glasgow and Clyde Cases",
  "highlandCases": "Highland Cases",
  "lanarkshireCases": "Lanarkshire Cases",
  "lothianCases": "Lothian Cases",
  "orkneyCases": "Orkney Cases",
  "shetlandCases": "Shetland Cases",
  "taysideCases": "Tayside Cases"
};

const colors = allDataChannels.reduce((map, obj) => {
  map[obj] = randomcolor({ luminosity: 'light' });
  return map;
}, {});

class App extends React.Component {

  constructor(props) {
    super(props);

    // build state checkbox items out of the available data
    this.state = allDataChannels.reduce((map, obj) => {
      var key = obj + "_enabled";
      map[key] = false;
      return map;
    }, {});
    this.state.graphScale = 'linear';
  }

  selectAllChannels(value) {
    this.setState(Object.keys(this.state).filter(item => item !== 'graphScale').reduce((p, c) => ({ ...p, [c]: value }), {}));
  }

  transformChartData(data) {
    let chartData = [];
    data.datasets.nodes.forEach((set, _) => {

      let dataset = allDataChannels.reduce((map, obj) => {
        map[obj] = set[obj];
        return map;
      }, {});
      dataset['date'] = set.date.split("T")[0];

      Object.keys(this.state).filter(item => item.endsWith('_enabled') && this.state[item] === true).forEach((channel, _) => {
        var channelName = channel.split('_')[0];
        if (this.state.graphScale === 'linear' || dataset[channelName] !== 0) {
          chartData.push(dataset);
        }
      })
    })
    return chartData;
  }

  handleCheckboxChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  setGraphScale = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
                    {allDataChannels.map(line =>
                      (
                        <FormControlLabel
                          control={<Checkbox checked={this.state[line + "_enabled"]} onChange={this.handleCheckboxChange} name={line + "_enabled"} />}
                          label={labels[line]}
                          key={line}
                        />
                      ))}
                    <ButtonGroup variant="contained" color="primary" style={{ width: "100%" }}>
                      <Button onClick={() => this.selectAllChannels(true)} style={{ width: "100%" }}>Select all</Button>
                      <Button onClick={() => this.selectAllChannels(false)} style={{ width: "100%" }}>Deselect all</Button>
                    </ButtonGroup>
                    <RadioGroup row aria-label="graph-scale" name="graphScale" value={this.state.graphScale} onChange={this.setGraphScale}>
                      <FormLabel style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 20, marginLeft: 10 }}>
                        <Typography variant="button">Scale:</Typography>
                      </FormLabel>
                      <FormControlLabel value="log" control={<Radio />} label="log" />
                      <FormControlLabel value="linear" control={<Radio />} label="linear" />
                    </RadioGroup>
                  </FormGroup>
                </Paper>
              </Grid>
              <Grid item sm={10}>
                <ResponsiveContainer >
                  <LineChart data={this.transformChartData(data)} margin={{ top: 5, right: 50, bottom: 5 }}>
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip contentStyle={{ background: '#424242' }} />
                    <XAxis dataKey="date" />
                    <YAxis scale={this.state.graphScale} domain={['1', 'auto']} />
                    {allDataChannels
                      .filter(line => this.state[line + "_enabled"] === true)
                      .map(line =>
                        (
                          <Line type="monotone" dataKey={line} name={labels[line]} stroke={colors[line]} key={line} />
                        ))}
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item sm={12}>
                <BottomNavigation style={{ width: '100%', position: 'fixed', bottom: 0, maxHeight: 45 }}>
                  <BottomNavigationAction icon={<GitHub />} href="https://github.com/dillanmann/scotgov-covid-chart"></BottomNavigationAction>
                  <BottomNavigationAction icon={<Twitter />} href="https://twitter.com/dillanmann"></BottomNavigationAction>
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
