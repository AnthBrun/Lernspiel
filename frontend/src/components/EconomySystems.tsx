import React, { useEffect, useState } from 'react';
import { fetchEconomySystems } from '@/lib/economySystems';

export function EconomySystems() {
    const [systems, setSystems] = useState<unknown[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEconomySystems()
            .then(setSystems)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Lade Wirtschaftssysteme...</div>;

    return (
        <ul>
            {systems.map(sys => (
                <React.Fragment key={sys.name}>
                    <li>
                        <strong>{sys.name}</strong>: {sys.description}
                        <div>
                            <u>Indikatoren:</u>
                            <ul>
                                {sys.indicators &&
                                    Object.entries(sys.indicators).map(([key, value]) => (
                                        <li key={key}>
                                            {key}: {value}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div>
                            <u>Parameter:</u>
                            <ul>
                                {sys.parameters &&
                                    Object.entries(sys.parameters).map(([key, value]) => (
                                        <li key={key}>
                                            {key}: {value}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </li>
                    <hr />
                </React.Fragment>
            ))}
        </ul>
    );
}
