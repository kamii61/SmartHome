PGDMP                         y         	   smarthome    13.3    13.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16427 	   smarthome    DATABASE     ^   CREATE DATABASE smarthome WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE smarthome;
                postgres    false            �            1259    16428    clients    TABLE     �   CREATE TABLE public.clients (
    client_id integer NOT NULL,
    client_name character varying(255) NOT NULL,
    client_password character varying,
    contact character varying,
    email character varying
);
    DROP TABLE public.clients;
       public         heap    postgres    false            �            1259    16434    clients_client_id_seq    SEQUENCE     �   ALTER TABLE public.clients ALTER COLUMN client_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.clients_client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            �            1259    16436    items    TABLE     �   CREATE TABLE public.items (
    item_id integer NOT NULL,
    client_id integer,
    item_name character varying,
    item_data_description character varying,
    item_status boolean,
    item_image text
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    16442    items_item_id_seq    SEQUENCE     �   ALTER TABLE public.items ALTER COLUMN item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    16444    rooms    TABLE     �   CREATE TABLE public.rooms (
    room_id integer NOT NULL,
    item_id integer,
    room_name character varying,
    room_image text
);
    DROP TABLE public.rooms;
       public         heap    postgres    false            �            1259    16450    rooms_room_id_seq    SEQUENCE     �   ALTER TABLE public.rooms ALTER COLUMN room_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rooms_room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    204            �          0    16428    clients 
   TABLE DATA           Z   COPY public.clients (client_id, client_name, client_password, contact, email) FROM stdin;
    public          postgres    false    200   �       �          0    16436    items 
   TABLE DATA           n   COPY public.items (item_id, client_id, item_name, item_data_description, item_status, item_image) FROM stdin;
    public          postgres    false    202   J       �          0    16444    rooms 
   TABLE DATA           H   COPY public.rooms (room_id, item_id, room_name, room_image) FROM stdin;
    public          postgres    false    204   �       �           0    0    clients_client_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.clients_client_id_seq', 6, true);
          public          postgres    false    201            �           0    0    items_item_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.items_item_id_seq', 14, true);
          public          postgres    false    203            �           0    0    rooms_room_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.rooms_room_id_seq', 52, true);
          public          postgres    false    205            ;           2606    16453    clients clients_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public            postgres    false    200            =           2606    16455    items items_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (item_id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    202            ?           2606    16457    rooms rooms_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);
 :   ALTER TABLE ONLY public.rooms DROP CONSTRAINT rooms_pkey;
       public            postgres    false    204            @           2606    16458    items fk_client    FK CONSTRAINT     y   ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES public.clients(client_id);
 9   ALTER TABLE ONLY public.items DROP CONSTRAINT fk_client;
       public          postgres    false    202    200    3131            A           2606    16463    rooms fk_item    FK CONSTRAINT     q   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES public.items(item_id);
 7   ALTER TABLE ONLY public.rooms DROP CONSTRAINT fk_item;
       public          postgres    false    204    3133    202            �   �   x�]�K� @��c���y��Lubl\��J�`L1�{qP�ޜ+�Ku���J�ف�
�n�1� ZX�!��䆋�����+3�p(�6�L�~x7[���kE�¸г�_'Q�����
b��4+�p,���!o��5�      �   1   x�34���V�,I͍�K�MU�RrO,VN�+�/R�ɂW� O�      �   8   x�35�����,I�H̓�zY��\�� )�̲̼t����\�0Ą������ �_�     