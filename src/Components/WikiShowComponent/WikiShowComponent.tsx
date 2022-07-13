import React, { useEffect, useState } from "react";
import {
  initialStateWikiResponse,
  WikiResponse,
} from "../../Services/types/wikiTypes";

import { GetEvents } from "../../Services/apiCalls";
import { UserClaims } from "@okta/okta-auth-js";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
interface WikiShowComponentProps {
  userInfo: UserClaims;
}

export const WikiShowComponent = ({ userInfo }: WikiShowComponentProps) => {
  const [date, setDate] = useState<null | Date>(null);
  const [result, setResult] = useState<WikiResponse>(initialStateWikiResponse);
  const { isError, isLoading, isSuccess, submitRequest } = GetEvents(
    date,
    setResult
  );

  useEffect(() => {
    let date_find = Object.entries(userInfo).find(
      (claimEntry) => claimEntry[0] === "birthdate"
    );

    if (date_find !== undefined) {
      let date_value = date_find[1];
      if (typeof date_value === "string") {
        const date_array = date_value.split(".");
        let selectedDate = new Date(
          date_array[1] + "/" + date_array[0] + "/" + date_array[2]
        );
        setDate(selectedDate);
      }
    }
  }, [userInfo]);

  return (
    <div>
      {!isSuccess && !isLoading && date && (
        <Button
          onClick={() => {
            submitRequest();
          }}
        >
          Get info from Date
        </Button>
      )}

      {isLoading && <Spinner animation="border" role="status" />}
      {isError && <p> Chyba pri nacitani api callu z WIKI</p>}
      {isSuccess && (
        <Table striped bordered hover>
          <tbody>
            {Object.entries(result).map((entry, _index) => {
              return (
                <tr key={entry[0]}>
                  <td>{entry[0]}</td>
                  <td>{entry[1][0].text}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
