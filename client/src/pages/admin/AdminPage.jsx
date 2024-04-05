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
    {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: "Active",
    },
    {
        key: "4",
        name: "William Howard",
        role: "Community Manager",
        status: "Vacation",
    },
    {
        key: "5",
        name: "John Miguel",
        role: "Software Engineer",
        status: "Vacation",
    },
    {
        key: "6",
        name: "Steve De La Rosa",
        role: "Front-End Engineer",
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
        <Table className="table">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        style={{ background: "#1C386C", color: "whitesmoke" }}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                    <TableRow key={item.key} className="table-row">
                        {(columnKey) => (
                            <TableCell className="table-cell">
                                {getKeyValue(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default AdminPage;
