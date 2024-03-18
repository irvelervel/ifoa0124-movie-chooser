import { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

class MovieCard extends Component {
  state = {
    // movieData sarà una volta completata la fetch un oggetto, con dentro le proprietà Year, Title, Poster, etc.
    movieData: null, // null è un valore FALSY, mentre { } è un valore TRUTHY
  }

  // scriviamo una funzione in grado di contattare le OMDB api e recuperare il titolo del film attualmente selezionato
  fetchMovieInfo = () => {
    // fetchMovieInfo contatterà le API, recupererà il valore di ricerca più plausibile (il primo dei risultati) e
    // salverà questo oggetto nello state
    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle)
      // es. "http://www.omdbapi.com/?apikey=24ad60e9&s=Iron man"
      // es. "http://www.omdbapi.com/?apikey=24ad60e9&s=Deadpool"
      .then((response) => {
        // se siamo finiti qui, la Promise della fetch si è risolta!
        if (response.ok) {
          // se finiamo qui, abbiamo probabilmente ottenuto quello che volevamo!
          // questa response contiene tante cose, per esempio lo status code, la proprietà ok etc.
          // una cosa che non contiene, però, è il JSON con i dati del server
          console.log('RESPONSE', response)
          // estraiamo il JSON dalla response
          return response.json()
        } else {
          // se finiamo qui, il server non ci ha tornato quello che volevamo...
          // es. 400, 404, 500
          throw new Error('Errore nel recupero dati del film')
        }
      })
      .then((data) => {
        console.log('JSON DALLE API', data)
        // ora lo salveremo nello stato del componente
        this.setState({
          movieData: data.Search[0],
        })
      })
      .catch((err) => {
        console.log('ERRORE', err)
      })
  }

  componentDidMount() {
    // questo metodo viene invocato automaticamente da React, se presente, subito dopo la prima invocazione di render()
    this.fetchMovieInfo()
  }

  render() {
    return (
      <>
        {!this.state.movieData && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {this.state.movieData && (
          <Card>
            <Card.Img
              variant="top"
              src={this.state.movieData.Poster}
              alt="movie poster"
            />
            <Card.Body>
              <Card.Title>{this.state.movieData.Title}</Card.Title>
              <Card.Text>
                {this.state.movieData.Year} - {this.state.movieData.imdbID}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    )
  }
}

export default MovieCard
