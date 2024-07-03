const Item = ({ name, quantity, category, onSelect }) => {
    return (
        <div
            className="border border-sky-400 bg-sky-900 w-full max-w-xs m-4 p-2 hover:bg-sky-700 cursor-pointer"
            onClick={() => onSelect(name)}
        >
            <h3 className="text-xl font-bold">{name}</h3>
            <p>Quantity: {quantity}</p>
            <p>Category: {category}</p>
        </div>
    );
};

export default Item;
