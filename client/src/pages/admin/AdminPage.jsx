import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
  { key: "1", name: "Tony Reichert", role: "CEO", status: "Active" },
  { key: "2", name: "Zoey Lang", role: "Technical Lead", status: "Paused" },
  { key: "3", name: "Jane Fisher", role: "Senior Developer", status: "Active" },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  { key: "name", label: "NAME" },
  { key: "role", label: "ROLE" },
  { key: "status", label: "STATUS" },
];

const AdminPage = () => {
  return (
    <div className="bg-[#343a40] p-4">
      <Table
        style={{
          backgroundColor: "",
        }}
        aria-label="Example table with dynamic content"
        className=""
      >
        <TableHeader stlye={{ backgroundColor: "#343a40" }} columns={columns}>
          {(column) => (
            <TableColumn
              style={{
                color: "white",
                backgroundColor: "#343a40",
              }}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rows}
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "#343a40",
          }}
        >
          {(item) => (
            <TableRow
              style={{
                backgroundColor: "#343a40",
                borderBottom: "1px solid #495057",
              }}
              key={item.key}
            >
              {(columnKey) => (
                <TableCell
                  key={columnKey}
                  style={{
                    backgroundColor: "#343a40",
                    color: "white",
                    borderBottom: "1px solid #495057",
                  }}
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPage;
