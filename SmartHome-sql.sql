PGDMP     
    8                x         	   smarthome     12.5 (Ubuntu 12.5-1.pgdg20.04+1)     13.1 (Ubuntu 13.1-1.pgdg20.04+1)     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    81932 	   smarthome    DATABASE     ^   CREATE DATABASE smarthome WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE smarthome;
                sysadmin    false            �            1259    81949    clients    TABLE     �   CREATE TABLE public.clients (
    client_id integer NOT NULL,
    client_name character varying(255) NOT NULL,
    client_password character varying,
    contact character varying,
    email character varying
);
    DROP TABLE public.clients;
       public         heap    sysadmin    false            �            1259    81947    clients_client_id_seq    SEQUENCE     �   ALTER TABLE public.clients ALTER COLUMN client_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.clients_client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          sysadmin    false    203            �            1259    81978    items    TABLE     �   CREATE TABLE public.items (
    item_id integer NOT NULL,
    client_id integer,
    item_name character varying,
    item_data_description character varying,
    item_status boolean
);
    DROP TABLE public.items;
       public         heap    sysadmin    false            �            1259    81976    items_item_id_seq    SEQUENCE     �   ALTER TABLE public.items ALTER COLUMN item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          sysadmin    false    205            �            1259    81993    rooms    TABLE     r   CREATE TABLE public.rooms (
    room_id integer NOT NULL,
    item_id integer,
    room_name character varying
);
    DROP TABLE public.rooms;
       public         heap    sysadmin    false            �            1259    81991    rooms_room_id_seq    SEQUENCE     �   ALTER TABLE public.rooms ALTER COLUMN room_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rooms_room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          sysadmin    false    207            �          0    81949    clients 
   TABLE DATA           Z   COPY public.clients (client_id, client_name, client_password, contact, email) FROM stdin;
    public          sysadmin    false    203   �       �          0    81978    items 
   TABLE DATA           b   COPY public.items (item_id, client_id, item_name, item_data_description, item_status) FROM stdin;
    public          sysadmin    false    205   >       �          0    81993    rooms 
   TABLE DATA           <   COPY public.rooms (room_id, item_id, room_name) FROM stdin;
    public          sysadmin    false    207   �       �           0    0    clients_client_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.clients_client_id_seq', 6, true);
          public          sysadmin    false    202            �           0    0    items_item_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.items_item_id_seq', 5, true);
          public          sysadmin    false    204            �           0    0    rooms_room_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.rooms_room_id_seq', 8, true);
          public          sysadmin    false    206                       2606    81956    clients clients_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public            sysadmin    false    203                        2606    81985    items items_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (item_id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            sysadmin    false    205            "           2606    82000    rooms rooms_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);
 :   ALTER TABLE ONLY public.rooms DROP CONSTRAINT rooms_pkey;
       public            sysadmin    false    207            #           2606    81986    items fk_client    FK CONSTRAINT     y   ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES public.clients(client_id);
 9   ALTER TABLE ONLY public.items DROP CONSTRAINT fk_client;
       public          sysadmin    false    2846    203    205            $           2606    82001    rooms fk_item    FK CONSTRAINT     q   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES public.items(item_id);
 7   ALTER TABLE ONLY public.rooms DROP CONSTRAINT fk_item;
       public          sysadmin    false    205    207    2848            �   �   x�]�K� @��c���y��Lubl\��J�`L1�{qP�ޜ+�Ku���J�ف�
�n�1� ZX�!��䆋�����+3�p(�6�L�~x7[���kE�¸г�_'Q�����
b��4+�p,���!o��5�      �   \   x�3�4�tN�M-J����T�-M�,�2�4��M,*q��/��H�KWH.�L�2�4�����p�Ä�KR�2��9��sR�KK��b���� ��      �   V   x�3�4���,I�H��2�4���,��KW����2F�3�A�%\�@�{bQbz*��1gdbQ
�g�gFjNN�By~QN
W� �N�     