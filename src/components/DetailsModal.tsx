
import "./DetailsModal.css";

export type DetailItem = {
  type: string;
  name: string;
  unitCost: number;
  quantity: number;
  subtotal: number;
};

type DetailsModalProps = {
  items: DetailItem[];
  total: number;
  onClose: () => void;
};

function DetailsModal({
  items,
  total,
  onClose,
}: DetailsModalProps) {
  const selectedItems = items.filter((item) => item.quantity > 0);

  const formatMoney = (amount: number) =>
    `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div
      className="details-overlay"
      onClick={onClose}
    >
      <div
        className="details-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
      >
        <button
          className="details-close"
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>

        <p className="details-eyebrow">YOUR EVENT SUMMARY</p>
        <h2 id="details-title">Selection Details</h2>
        <p className="details-description">
          Here's a breakdown of your conference plan.
        </p>

        {selectedItems.length > 0 ? (
          <div className="details-table-wrapper">
            <table className="details-table">
              <thead>
                <tr>
                  <th>Selection Type</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {selectedItems.map((item) => (
                  <tr key={`${item.type}-${item.name}`}>
                    <td>
                      <strong>{item.name}</strong>
                      <span className="details-item-type">
                        {item.type}
                      </span>
                    </td>
                    <td>{formatMoney(item.unitCost)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatMoney(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="details-empty">
            You haven't selected any items yet.
          </p>
        )}

        <div className="details-total">
          <span>Grand Total</span>
          <strong>{formatMoney(total)}</strong>
        </div>

        <button
          className="details-done"
          onClick={onClose}
        >
          Continue Planning
        </button>
      </div>
    </div>
  );
}

export default DetailsModal;
