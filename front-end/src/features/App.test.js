import { render, screen } from '@testing-library/react';
import { App } from './App';
import '../styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom/extend-expect';

const queryClient = new QueryClient();

test('renders title', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    );
    const restaurant = screen.getByText(/periodic tables/i);
    expect(restaurant).toBeInTheDocument();
});

// const container = document.getElementById('root');
// const root = createRoot(container);
//
// const queryClient = new QueryClient();
//
// root.render(
//     <React.StrictMode>
//
//     </React.StrictMode>
// );
