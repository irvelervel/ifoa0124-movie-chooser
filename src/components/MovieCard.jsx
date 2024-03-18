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

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdate è un altro metodo di lifecycle, come render() e come componentDidMount()
    // componentDidUpdate viene automaticamente invocato, se esiste, ogni volta che cambia lo stato e ogni volta che cambiano le props
    // i due parametri, prevProps e prevState sono importantissimi e devono venire utilizzati OGNI volta che si scrive un componentDidUpdate
    // sono di fatto la differenza tra render() e componentDidUpdate()
    // è sempre una pessima prassi inserire in render() un metodo che lancerà un setState -> loop infinito
    // la nostra fetchMovieInfo() dovrebbe ascoltare un cambio di PROPS, in modo da potersi re-invocare ogni volta che il titolo
    // del film cambia
    // quello che non va bene, però, è che per colpa del setState noi RI-ENTRIAMO nel render()!
    // il bello di componentDidUpdate è che noi possiamo distinguere tra i casi:
    // 1) è cambiata una prop
    // 2) è cambiato lo stato
    //
    // ora "ingabbio" l'invocazione di fetchMovieInfo() in un if()
    // questo if la farà re-invocare SOLAMENTE quando cambiano le props, e NON quando cambia lo stato
    if (prevProps.movieTitle !== this.props.movieTitle) {
      // ...solo quando c'è stato un cambio della prop movieTitle
      this.fetchMovieInfo()
    }
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
