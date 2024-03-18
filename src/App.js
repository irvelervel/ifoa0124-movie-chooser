import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieNavbar from './components/MovieNavbar'
import MovieCard from './components/MovieCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { Component } from 'react'

class App extends Component {
  state = {
    movieTitle: 'Iron man',
  }

  render() {
    return (
      <div>
        <MovieNavbar />
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              {/* ora vado ad inserire l'input field di tipo select per scegliere un film */}
              {/* per ora lo inserirò qui senza crearne un componente separato, se ci avanza tempo lo facciamo dopo :) */}
              <Form>
                <Form.Group className="my-3">
                  <Form.Label id="select-label">Scegli un film</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      // cambio lo stato ogni volta che scelgo un nuovo film
                      this.setState({
                        movieTitle: e.target.value,
                      })
                    }}
                    // seconda mandata: il valore di questa select sarà indissolubilmente collegato allo stato
                    value={this.state.movieTitle}
                  >
                    <option>Iron man</option>
                    <option>Dr. Strange</option>
                    <option>Venom</option>
                    <option>Thor: Love & Thunder</option>
                    <option>Deadpool</option>
                    <option>Guardiani della Galassia Vol.1</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <MovieCard movieTitle={this.state.movieTitle} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
