import { Link } from "react-router-dom";

type Stock = {
  symbol: string;
  price: number | null;
};

type Props = {
  stocks: Stock[];
};

function StockTable({ stocks }: Props) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={thStyle}>Stock</th>
          <th style={thStyle}>Price (₹)</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td style={tdStyle}>
              <Link to={`/stock/${stock.symbol}`}>
                {stock.symbol}
              </Link>
            </td>
            <td style={tdStyle}>
              {stock.price !== null ? stock.price : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  borderBottom: "1px solid #ccc",
  textAlign: "left" as const,
  padding: "8px",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px",
};

export default StockTable;
