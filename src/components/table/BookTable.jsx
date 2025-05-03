import React from "react";
import { Button, Table } from "react-bootstrap";

const BookTable = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Available ?</th>
            <th>Edit </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.dnFlgevOeigKOSvSTB8INAHaKe&pid=Api&P=0&h=180"
                alt=""
                width="70px"
              />
            </td>
            <td>JS Book</td>
            <td>Yes/No</td>
            <td>
              <Button variant="warning">Edit</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;
