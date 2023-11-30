// Importa a função jwtDecode do módulo jwt-decode para decodificar tokens JWT
import { jwtDecode } from "jwt-decode";

// Importa a função createContext do módulo React para criar um contexto de usuário
import { createContext } from "react";

// Cria um contexto de usuário para ser utilizado em toda a aplicação
export const UserContext = createContext(null);

// Função para decodificar um token JWT e extrair informações relevantes
export const userDecodeToken = (theToken) => {
    // Decodifica o token JWT e obtém o objeto payload
    const decoded = jwtDecode(theToken);

    // Retorna um objeto contendo informações úteis do usuário
    return {
        role: decoded.role,     // Papel ou função do usuário
        nome: decoded.name,     // Nome do usuário
        token: theToken,        // Token JWT original
        userId: decoded.jti      // ID do usuário extraído do token
    };
};
