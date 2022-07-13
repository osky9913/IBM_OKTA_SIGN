import React from "react";
import { UserClaims } from "@okta/okta-auth-js";
import Table from "react-bootstrap/Table";

interface TableComponentProps {
  userInfo: UserClaims;
}

const TableComponent = ({ userInfo }: TableComponentProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Claim</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(userInfo).map((claimEntry) => {
          const claimName = claimEntry[0];
          const claimValue: any = claimEntry[1];
          const claimId = `claim-${claimName}`;
          return (
            <tr key={claimName}>
              <td>{claimName}</td>
              <td id={claimId}>{claimValue.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableComponent;
