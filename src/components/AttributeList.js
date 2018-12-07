import React from "react";
import { List } from "semantic-ui-react";

export default function AttributeList({ attributes }) {
  return (
    <List>
      <List.Item>
        <List.Icon name="building" />
        <List.Content>
          <List.Header>{attributes.Provider}</List.Header>
        </List.Content>
      </List.Item>
      {attributes.Address && (
        <List.Item>
          <List.Icon name="map marker alternate" />
          <List.Content>
            <List.Header>
              {attributes.Address}, {attributes.Zipcode}
            </List.Header>
          </List.Content>
        </List.Item>
      )}
      {attributes.Phone && (
        <List.Item>
          <List.Icon name="phone" />
          <List.Content>
            {attributes.Phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3")}
          </List.Content>
        </List.Item>
      )}
      {attributes.Email && (
        <List.Item>
          <List.Icon name="phone" />
          <List.Content>{attributes.Email}</List.Content>
        </List.Item>
      )}
      <List.Item>
        <List.Icon name="content" />
        <List.Content>{attributes.Description}</List.Content>
      </List.Item>
    </List>
  );
}
