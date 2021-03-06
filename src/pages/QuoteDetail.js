import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import {getSingleQuote} from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    const {quoteId} = params;

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        );
    }

    if (error) {
        return (
            <div className='centered'>
                <p>{error}</p>
            </div>
        );
    }

    if (!loadedQuote.text) {
        return (
            <div className='centered'>
                <p>No quote found!</p>
            </div>
        );
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
        
    );
}

export default QuoteDetail;