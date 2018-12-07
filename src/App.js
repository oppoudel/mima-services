import React, { Component } from "react";
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
  handleInputChange = e => {
    const { features, selected } = this.state;
    this.setState({
      query: e.target.value,
      filteredFeatures: features
        .filter(feature =>
          feature.properties.Description.includes(e.target.value)
        )
        .filter(f => f.properties.Tag.includes(selected))
    });
  };
  handleSelectChange = (e, data) => {
    const { features, query } = this.state;

    const val = data.value === "all" ? "" : data.value;
    this.setState({
      selected: val,
      filteredFeatures: features
        .filter(f => f.properties.Tag.includes(val))
        .filter(feature => feature.properties.Description.includes(query))
    });
  };
  async componentDidMount() {
    const results = await appService.getFeatures();
    this.setState({
      features: results.features,
      filteredFeatures: results.features
    });
  }
  render() {
    const { query, filteredFeatures } = this.state;

    return (
      <Container style={{ marginTop: "2em" }}>
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
                onChange={this.handleInputChange}
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
