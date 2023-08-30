
-- tbale 1


CREATE TABLE IF NOT EXISTS public.users
(
    userid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000000 CACHE 1 ),
    username text COLLATE pg_catalog."default" NOT NULL,
    type_id integer NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    phone_number text COLLATE pg_catalog."default" NOT NULL,
    flags integer NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (userid),
    CONSTRAINT users_type_id_fkey FOREIGN KEY (type_id)
        REFERENCES public.usertype (typeid) MATCH SIMPLE
        ON UPDATE SET DEFAULT
        ON DELETE SET DEFAULT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;



-- tbale 2



    
CREATE TABLE IF NOT EXISTS public.usertype
(
    typeid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000000 CACHE 1 ),
    typename text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usertype_pkey PRIMARY KEY (typeid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usertype
    OWNER to postgres;


-- tbale 3


    
CREATE TABLE IF NOT EXISTS public.products
(
    product_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    price text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    photo text COLLATE pg_catalog."default" NOT NULL,
    flags integer DEFAULT 0,
    new_price text COLLATE pg_catalog."default" DEFAULT 0,
    disflag integer DEFAULT 0,
    quantity integer DEFAULT 1,
    user_id integer,
    drawingflag integer,
    CONSTRAINT products_pkey PRIMARY KEY (product_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;


-- tbale 4


CREATE TABLE IF NOT EXISTS public.wishlist
(
    wishlist_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000 CACHE 1 ),
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    photo text COLLATE pg_catalog."default" NOT NULL,
    price text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT wishlist_pkey PRIMARY KEY (wishlist_id),
    CONSTRAINT wishlist_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.products (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT wishlist_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wishlist
    OWNER to postgres;


-- tbale 5



    CREATE TABLE IF NOT EXISTS public.payment
(
    paymentid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 1000000 CACHE 1 ),
    username text COLLATE pg_catalog."default" NOT NULL,
    cardnumber text COLLATE pg_catalog."default" NOT NULL,
    datecard text COLLATE pg_catalog."default" NOT NULL,
    cvc text COLLATE pg_catalog."default" NOT NULL,
    userid integer NOT NULL,
    CONSTRAINT payment_pkey PRIMARY KEY (paymentid),
    CONSTRAINT payment_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.payment
    OWNER to postgres;


-- tbale 6


CREATE TABLE IF NOT EXISTS public.contacts
(
    contact_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 1000000 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    phone text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    message text COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT contacts_pkey PRIMARY KEY (contact_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE SET DEFAULT
        ON DELETE SET DEFAULT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.contacts
    OWNER to postgres;
-- Index: fki_user_id

-- DROP INDEX IF EXISTS public.fki_user_id;

CREATE INDEX IF NOT EXISTS fki_user_id
    ON public.contacts USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- tbale 7



    CREATE TABLE IF NOT EXISTS public.cart
(
    cart_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000 CACHE 1 ),
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    price text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    photo text COLLATE pg_catalog."default" NOT NULL,
    quantity text COLLATE pg_catalog."default",
    CONSTRAINT cart_pkey PRIMARY KEY (cart_id),
    CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.products (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cart
    OWNER to postgres;

-- tbale 8



    CREATE TABLE IF NOT EXISTS public.aboutus
(
    about_us text COLLATE pg_catalog."default",
    about_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 100000 CACHE 1 ),
    about_title text COLLATE pg_catalog."default",
    CONSTRAINT "about _pkey" PRIMARY KEY (about_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.aboutus
    OWNER to postgres;


-- tbale 9




CREATE TABLE IF NOT EXISTS public.orders
(
    orders_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 100000 CACHE 1 ),
    user_id integer NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    count integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    photo text COLLATE pg_catalog."default" NOT NULL,
    price text COLLATE pg_catalog."default" NOT NULL,
    product_id integer,
    CONSTRAINT orders_pkey PRIMARY KEY (orders_id),
    CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.products (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orders
    OWNER to postgres;
