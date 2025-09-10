import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [searchParams, setSearchParams] = useState({
    origin: 'YYZ', // Toronto
    destination: 'LGA', // New York LaGuardia
    departureDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
    passengers: 1
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceAlert, setPriceAlert] = useState({
    email: '',
    targetPrice: '',
    enabled: false
  });

  const handleSearch = async () => {
    setLoading(true);
    // Placeholder for API call - will implement in Phase 2
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          airline: 'Air Canada',
          price: 285,
          departure: '08:30',
          arrival: '10:45',
          duration: '1h 15m',
          stops: 'Direct'
        },
        {
          id: 2,
          airline: 'Porter Airlines',
          price: 320,
          departure: '14:20',
          arrival: '16:35',
          duration: '1h 15m',
          stops: 'Direct'
        },
        {
          id: 3,
          airline: 'WestJet',
          price: 255,
          departure: '19:45',
          arrival: '22:00',
          duration: '1h 15m',
          stops: 'Direct'
        }
      ]);
      setLoading(false);
    }, 2000);
  };

  const handlePriceAlert = () => {
    if (priceAlert.email && priceAlert.targetPrice) {
      alert(`Price alert set! You'll be notified when flights drop below $${priceAlert.targetPrice}`);
      setPriceAlert({ ...priceAlert, enabled: true });
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand h1">✈️ CheapFlights Tracker</span>
          <span className="navbar-text">Find the best deals from Toronto to New York</span>
        </div>
      </nav>

      <div className="container mt-4">
        {/* Search Form */}
        <div className="card mb-4">
          <div className="card-header">
            <h4>Search Flights</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">From</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={searchParams.origin}
                  onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">To</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Departure</label>
                <DatePicker
                  selected={searchParams.departureDate}
                  onChange={(date) => setSearchParams({...searchParams, departureDate: date})}
                  className="form-control"
                  minDate={new Date()}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Return</label>
                <DatePicker
                  selected={searchParams.returnDate}
                  onChange={(date) => setSearchParams({...searchParams, returnDate: date})}
                  className="form-control"
                  minDate={searchParams.departureDate}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <label className="form-label">Passengers</label>
                <select 
                  className="form-control"
                  value={searchParams.passengers}
                  onChange={(e) => setSearchParams({...searchParams, passengers: e.target.value})}
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                </select>
              </div>
              <div className="col-md-9 d-flex align-items-end">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search Flights'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Alert Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5>💰 Price Alert</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  value={priceAlert.email}
                  onChange={(e) => setPriceAlert({...priceAlert, email: e.target.value})}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Target price ($CAD)"
                  value={priceAlert.targetPrice}
                  onChange={(e) => setPriceAlert({...priceAlert, targetPrice: e.target.value})}
                />
              </div>
              <div className="col-md-4">
                <button 
                  className="btn btn-success"
                  onClick={handlePriceAlert}
                  disabled={priceAlert.enabled}
                >
                  {priceAlert.enabled ? '✓ Alert Active' : 'Set Price Alert'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h5>Flight Results</h5>
            </div>
            <div className="card-body">
              {searchResults.map(flight => (
                <div key={flight.id} className="border rounded p-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <strong>{flight.airline}</strong>
                    </div>
                    <div className="col-md-2">
                      <span className="h4 text-primary">${flight.price}</span>
                    </div>
                    <div className="col-md-3">
                      <div>{flight.departure} → {flight.arrival}</div>
                      <small className="text-muted">{flight.duration}</small>
                    </div>
                    <div className="col-md-2">
                      <span className="badge bg-info">{flight.stops}</span>
                    </div>
                    <div className="col-md-3">
                      <button className="btn btn-outline-primary">Select Flight</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Stats */}
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">🔄 Live Tracking</h5>
                <p className="card-text">Prices updated every 4 hours</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">📧 Smart Alerts</h5>
                <p className="card-text">Get notified of price drops</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">📈 Price History</h5>
                <p className="card-text">30-day trend analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5 py-4 bg-light text-center">
        <p className="text-muted">
          Built with AWS • React.js • Powered by real-time flight data
        </p>
      </footer>
    </div>
  );
}

export default App;

