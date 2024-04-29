import { useState, useEffect, useCallback, useRef } from "react";
import { fetchRanking } from "./services";
import Status from "./Status";
import { POLLING_DELAY } from "./constants";

function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [error, setError] = useState('');

    const pollingRef = useRef();

    const getRanking = () => {
        fetchRanking()
        .then((rank) => {
            setRanking(rank.ranking);
            setError('');
        })
        .catch((err) => {
            setError(err?.error || 'ERROR');
        });
    }

    const polling = useCallback(() => {
        fetchRanking()
        .then((rank) => {
            setRanking(rank.ranking);
            setError('');
        })
        .then(() => {
            pollingRef.current = setTimeout(polling, POLLING_DELAY);
        })
        .catch((err) => {
            setError(err?.error || 'ERROR');
            pollingRef.current = setTimeout(polling, POLLING_DELAY);
        });
    }, []);


    useEffect(() => {
        getRanking();
    }, []);

    useEffect(() => {
        pollingRef.current = setTimeout(polling, POLLING_DELAY);
        return () => {
            clearTimeout(pollingRef.current);
        };
    }, [polling]);


  return (
  <>
    <h2 className="ranking__title">Ranking</h2>
    <p>(Username --- Attemps)</p>
    {error && <Status error={error} />}
    <ol className="ranking__list">
        {ranking.map((rank) => (
            <li key={rank.username}>{rank.username} --- {rank.attemps}</li>
        ))}
    </ol>
  </>);
}

export default Ranking;
