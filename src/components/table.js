import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";

export default function MakeTable(props) {
  let { protein, carbs, fat, title } = props;

  return (
    <TableContainer style={{ marginTop: "2em" }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Per 100g serving</TableCell>
            <TableCell align="right">Carbohydrates (g)</TableCell>
            <TableCell align="right">Fat&nbsp; (g)</TableCell>
            <TableCell align="right">Protein&nbsp; (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {title}
            </TableCell>
            <TableCell align="right">{carbs}</TableCell>
            <TableCell align="right">{fat}</TableCell>
            <TableCell align="right">{protein}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
