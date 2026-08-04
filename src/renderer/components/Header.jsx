import '../Styles/Header.css';

export default function Header() {
    return (
        <header className="app-header">
            <h1 className="header-title">AirPredict</h1>
            <button className="add-flight-btn">Add Flight</button>
        </header>
    );
}