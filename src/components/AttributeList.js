import React from "react";
import { List } from "semantic-ui-react";

export default function AttributeList({ info }) {
  return (
    <List>
      <List.Item>
        <List.Icon name="building" />
        <List.Content>
          <List.Header>{info.Provider}</List.Header>
        </List.Content>
      </List.Item>
      {info.Address && (
        <List.Item>
          <List.Icon name="map marker alternate" />
          <List.Content>
            <List.Header>
              {info.Address}, {info.City}, {info.State} {info.Zipcode}
            </List.Header>
          </List.Content>
        </List.Item>
      )}
      {info.Phone && (
        <List.Item>
          <List.Icon name="phone" />
          <List.Content>
            {info.Phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3")}
          </List.Content>
        </List.Item>
      )}
      {info.Email && (
        <List.Item>
          <List.Icon name="phone" />
          <List.Content>{info.Email}</List.Content>
        </List.Item>
      )}
      <List.Item>
        <List.Icon name="content" />
        <List.Content>{info.Description}</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="linkify" />
        <List.Content>
          <a href={info.URL}>{info.Provider}</a>
        </List.Content>
      </List.Item>
    </List>
  );
}
