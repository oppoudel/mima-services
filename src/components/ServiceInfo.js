import React, { PureComponent } from "react";
import { List } from "semantic-ui-react";

export default class ServiceInfo extends PureComponent {
  render() {
    const { info } = this.props;

    return (
      <div>
        <List>
          <List.Item>
            <List.Content>
              <List.Header>{info.Provider}</List.Header>
            </List.Content>
          </List.Item>
          {info.Address && (
            <List.Item>
              <List.Content>
                {info.Address}, {info.Zipcode}
              </List.Content>
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}
