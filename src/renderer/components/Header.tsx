import '../Styles/Header.css';

export default function Header() {
    return (
        <header className="app-header">
            <h1 className="header-title">AirPredict</h1>
            <button className="add-flight-btn">Add Flight</button>
            <button className="remove-flight-btn">Remove Flight</button>
            <button className="view-flights-btn">View Flights</button>
        </header>
    );
}