/* eslint-disable no-unused-vars */
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react()],
	server: {
		port: 5173,
		proxy: {	//CONFIGURAR LOS PREFIJOS DE LAS PETICIONES
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false,
				selfHandleResponse: false,
				configure: (proxy, _options) => {
					
					proxy.on('proxyRes', (proxyRes, req, res) => {
						if (proxyRes.statusCode === 401) {
							console.log('Redirigiendo...');
							res.writeHead(401, {
								'Location': '/login'
							});
							res.end();
							return;
						}
						//continue normally
						proxyRes.pipe(res);
					});
				}
			},
		},
	},
});
