import { Button } from "@material-ui/core";

export default function Home() {
  return (
    <body
      id="kt_body"
      class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading"
    >
      <div className="card card-custom">
        <div className="card-header flex-wrap border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label">Your ingredients</h3>
          </div>

          <div className="card-toolbar">
            <a href="# " className="btn btn-primary font-weight-bolder">
              New Record
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded">
          <table className="datatable-table" style={{ display: "block" }}>
            <th className="datatable-head">
              <tr className="datatable-row" style={{ left: "0px" }}>
                <th className="datatable-cell-center datatable-cell datatable-cell-sort datatable-cell-sorted">
                  <span style={{ width: "30px" }}>#</span>
                </th>
                <th className="datatable-cell datatable-cell-sort">
                  <span style={{ width: "108px" }}>Title</span>
                </th>
                <th className="datatable-cell datatable-cell-sort">
                  <span style={{ width: "108px" }}>Title</span>
                </th>
                <th className="datatable-cell datatable-cell-sort">
                  <span style={{ width: "108px" }}>Title</span>
                </th>
              </tr>
            </th>

            <tbody className="datatable-body">
              <tr
                data-row="0"
                className="datatable-row datatable-row-even"
                style={{ left: "0px" }}
              >
                <td
                  className="datatable-cell-sorted datatable-cell-center datatable-cell"
                  aria-label="1"
                >
                  <span style={{ width: "30px" }}>1</span>
                </td>

                <td
                  data-field="title"
                  className="datatable-cell"
                  aria-label="64616-103"
                >
                  <span style={{ width: "108px" }}>fetched title here</span>
                </td>

                <td
                  data-field="title"
                  className="datatable-cell"
                  aria-label="64616-103"
                >
                  <span style={{ width: "108px" }}>fetched title here</span>
                </td>
                <td
                  data-field="title"
                  className="datatable-cell"
                  aria-label="64616-103"
                >
                  <span
                    style={{
                      overflow: "visible",
                      position: "relative",
                      width: "125px",
                      display: "flex",
                    }}
                  >
                    <Button variant="outlined" size="small" color="primary">
                      Small
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      Small
                    </Button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>
  );
}
