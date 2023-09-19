﻿namespace webapi.event_.manha.Utils
{
    public static class Criptografia
    {
        public static string GerarHash(String senha)
        { 
        return BCrypt.Net.BCrypt.HashPassword(senha);
        }

        public static bool compararHash(string senhaForm, string senhaBanco)
        {
            return BCrypt.Net.BCrypt.Verify(senhaForm, senhaBanco);
        }
    }
}