Subir esta carpeta a:

/domains/aionsite.com.mx/public_html/social/private/

Estructura recomendada:

/domains/aionsite.com.mx/public_html/social/
  public/
    convierte-visitas-en-clientes.png
    futuras-imagenes-para-buffer.png
  private/
    index.html
    .htaccess
    .htpasswd

IMPORTANTE:

1. No subas .htpasswd.example como .htpasswd sin cambiar el hash.
2. Crea el hash en Hostinger o con un generador htpasswd bcrypt/Apache.
3. Guarda el archivo final como:

/domains/aionsite.com.mx/public_html/social/private/.htpasswd

4. El usuario sugerido es:

aionsite

5. El contenido final debe verse parecido a:

aionsite:$2y$10$HASH_REAL_AQUI

6. La galeria privada quedara en:

https://aionsite.com.mx/social/private/

7. Las imagenes publicas para Buffer deben quedar en:

https://aionsite.com.mx/social/public/nombre-del-archivo.png

8. Si quieres proteger solo la galeria, deja .htaccess dentro de private/.
No pongas .htaccess en /social/ porque Buffer no podra leer las imagenes publicas.
