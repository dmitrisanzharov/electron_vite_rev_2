import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    const [memory, setMemory] = useState<any>({ loading: true });

    useEffect(() => {
        console.log('window in renderer', window);

        (window as any).electronAPI.anyName().then((result: any) => {
            console.log('result', result);
        });

        let yaya = (window as any).electronAPI.noMainValue('argument1');
        console.log('yaya: ', yaya);

        (window as any).electronAPI.getMemory().then((r: any) => {
            setMemory({ ...r, loading: false });
        });
    }, []);

    return (
        <>
            <h1>Hello from React + Electron!</h1>
            <p>this also paragraph</p>
            <hr />
            {memory?.loading ? (
                <h2>loading</h2>
            ) : (
                <>
                    <ul>
                        <li>total: {memory.total}</li>
                        <li>free: {memory.free}</li>
                        <li>used: {memory.total - memory.free}</li>
                    </ul>
                </>
            )}
        </>
    );
}

const root = createRoot(document.getElementById('app')!);

root.render(<App />);
