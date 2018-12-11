import React, { Component } from "react";
import { throttle, debounce } from "throttle-debounce";
import {
  Container,
  Segment,
  Input,
  Grid,
  Select,
  Card
} from "semantic-ui-react";
import appService from "./appService";
import AttributeList from "./components/AttributeList";
import MapboxMap from "./components/MapboxMap";

const serviceOptions = [
  { key: "a", text: "All Services", value: "all" },
  { key: "b", text: "Business", value: "business" },
  { key: "c", text: "Culture", value: "culture" },
  { key: "e", text: "Education", value: "education" },
  { key: "em", text: "Employment", value: "employment" },
  { key: "h", text: "Health", value: "health" },
  { key: "ho", text: "Home", value: "home" },
  { key: "l", text: "Legal", value: "legal" },
  { key: "li", text: "Libraries", value: "libraries" }
];

class App extends Component {
  state = {
    features: [],
    query: "",
    selected: "",
    filteredFeatures: []
  };
  async componentDidMount() {
    const results = await appService.getFeatures();
    this.setState({
      features: results.features,
      filteredFeatures: results.features
    });
  }
  changeQuery = event => {
    this.setState({ query: event.target.value }, () => {
      const q = this.state.query;
      if (q.length < 5) {
        throttle(100, this.filterResults(q));
      } else {
        debounce(100, this.filterResults(q));
      }
    });
  };
  filterResults = query => {
    const { features, selected } = this.state;
    this.setState({
      filteredFeatures: this.filterFeatures(features, query, selected)
    });
  };

  handleSelectChange = (e, data) => {
    const { features, query } = this.state;
    const val = data.value === "all" ? "" : data.value;
    this.setState({
      selected: val,
      filteredFeatures: this.filterFeatures(features, query, val)
    });
  };
  filterFeatures = (features, query, selected) => {
    return features
      .filter(f => {
        const lowerCaseSearchText = (
          f.properties.Description + f.properties.Provider
        ).toLowerCase();
        return lowerCaseSearchText.includes(query.toLowerCase());
      })
      .filter(f => f.properties.Tag.includes(selected));
  };

  render() {
    const { query, filteredFeatures } = this.state;

    return (
      <Container style={{ marginTop: "2em", marginBottom: "2em" }}>
        <Card fluid style={{ marginBottom: "3em" }}>
          <MapboxMap features={filteredFeatures} />
        </Card>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Input
                icon="search"
                fluid
                placeholder="Search Services ..."
                value={query}
                onChange={this.changeQuery}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Select
                fluid
                placeholder="Select Type"
                options={serviceOptions}
                onChange={this.handleSelectChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {filteredFeatures.map(feature => (
          <Segment key={feature.properties.ID}>
            <AttributeList info={feature.properties} />
          </Segment>
        ))}
      </Container>
    );
  }
}

export default App;
