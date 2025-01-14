const ID_TOKEN_KEY = 'six-cities-token';

type Token = string;

class JwtService {
  getToken(): Token {
    return window.localStorage.getItem(ID_TOKEN_KEY) ?? '';
  }

  saveToken(token: Token): void {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
  }

  destroyToken(): void {
    window.localStorage.removeItem(ID_TOKEN_KEY);
  }
}

export default new JwtService();
