
import "./QuantityControl.css";

type QuantityControlProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
};

function QuantityControl({
  quantity,
  onChange,
  min = 0,
}: QuantityControlProps) {
  return (
    <div className="quantity-control">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span>{quantity}</span>

      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
