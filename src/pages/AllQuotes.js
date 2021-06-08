import QuoteList from '../components/quotes/QuoteList'

const DUMMY_QUOTES = [
    {id: 'q1', author: 'Rohan', text:'it\'s wonderful book'},
    {id: 'q2', author: 'Bus', text:'Truely amazing book'}
];

const AllQuotes = () => {
    return (
        <QuoteList quotes={DUMMY_QUOTES}/>
    );
}

export default AllQuotes;