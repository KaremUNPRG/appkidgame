<!DOCTYPE html>
<html lang="es">
<head>
    <title>Kid Game</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Fredericka+the+Great" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{asset('template/css/open-iconic-bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/animate.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/owl.theme.default.min.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/magnific-popup.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/aos.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/ionicons.min.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/flaticon.css')}}">
    <link rel="stylesheet" href="{{asset('template/css/style.css')}}">
    <link rel="stylesheet" href="{{asset('materialize/css/materialize.min.css')}}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    @yield('style')
    <style>
        .row{
            margin-bottom: 0px!important;
        }
        nav{
            height: auto!important;
            box-shadow:none!important;
            line-height: inherit;
        }
        .nav-item,.nav-item:hover{
            background: transparent!important;
        }
        .nav-item:hover a{
            background: transparent!important;
        }
        .modal{
            height: auto;
        }
        .option-configuracion{
            position: absolute;
            box-shadow: 1px 1px 11px 1px rgb(0 0 0 / 10%);
            color: #000;
            padding: 20px;
            bottom: -100px;
            right: 0;
            background: #fff;
            z-index: 111;
            width: 200px;
            display: none;
            /* transform: translateX(200px);  */
        }

        .option-configuracion a{
            color: #001;
        }

        .show-option{
            animation: optionuser 0.5s;
            transition: 0.5s;
            display: block;
            /* transform: translateX(0px)!important; */
        }

        @keyframes optionuser {
            0% { transform: translateX(200px);  }
            100% { transform: translateX(0px);  }
        }
        .ftco-navbar-light.scrolled{
            margin-top: -0px;
            background: #e2f1fc !important;
        }
        .ftco_navbar{
            position: fixed;
            background: #e2f1fc!important;
        }
        #preloader_3{
            position:relative;
            margin: 10% auto;
        }
        #preloader_3:before{
            width:20px;
            height:20px;
            border-radius:20px;
            background:blue;
            content:'';
            position:absolute;
            background:#9b59b6;
            animation: preloader_3_before 1.5s infinite ease-in-out;
        }
        
        #preloader_3:after{
            width:20px;
            height:20px;
            border-radius:20px;
            background:blue;
            content:'';
            position:absolute;
            background:#2ecc71;
            left:22px;
            animation: preloader_3_after 1.5s infinite ease-in-out;
        }
        
        @keyframes preloader_3_before {
            0% {transform: translateX(0px) rotate(0deg)}
            50% {transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
            100% {transform: translateX(0px) rotate(0deg)}
        }
        @keyframes preloader_3_after {
            0% {transform: translateX(0px)}
            50% {transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
            100% {transform: translateX(0px)}
        }
    </style>

</head>

<body>
    <div class="py-2 bg-primary hide">
        <div class="container">
            <div class="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
                <div class="col-lg-12 d-block">
                    <div class="row d-flex">
                        <div class="col-md-5 pr-4 d-flex topper align-items-center">
                        </div>
                        <div class="col-md pr-4 d-flex topper align-items-center">
                            <div class="icon bg-secondary mr-2 d-flex justify-content-center align-items-center"><span
                                    class="icon-paper-plane"></span></div>
                            <span class="text">soporte.kidgame@gmail.com</span>
                        </div>
                        <div class="col-md pr-4 d-flex topper align-items-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ftco_navbar ftco-navbar-light" id="ftco-navbar">
        <div class="container d-flex align-items-center">
            <a class="navbar-brand" href="/"><img style="width: 60px;" src="{{asset('logo.png')}}" alt=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="oi oi-menu"></span>
                <!-- Menu -->
            </button>
            <div class="collapse navbar-collapse" id="ftco-nav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active"><a href="/" class="nav-link pl-0">Inicio</a></li>
                    @if (Auth::check())
                        <li class="nav-item"><a href="{{route('tema')}}" class="nav-link">Temas</a></li>
                        <li class="nav-item"><a href="{{route('ahorcado')}}" class="nav-link">Ahorcado</a></li>
                        <li class="nav-item"><a href="{{route('memorama')}}" class="nav-link">Memoria</a></li>
                        <li class="nav-item" ><a href="{{route('sopaletras')}}" class="nav-link">Sopa de letras</a></li>
                        <li class="nav-item" ><a href="{{route('competencia')}}" class="nav-link">Competencias</a></li>
                        <li class="nav-item" style="position: relative">
                            <div class="configuracion-user" style="    display: flex;
                            align-items: center;
                            height: 100%;">
                                <img style="width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                cursor: pointer;
                                margin-left: 20px;" src="{{Auth::user()->Avatar}}" alt="">
                                <div class="option-configuracion">
                                    <ul>
                                        <li><a href=""><span class="material-symbols-outlined">
                                            person_pin
                                            </span> Mi Cuenta</a></li>
                                        <li class="salirCuenta"><a href="#"><span class="material-symbols-outlined">
                                            exit_to_app
                                            </span><span class="ion-md-setting"></span> Cerrar Sesión</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </li>
                    @else
                        <li class="nav-item"><a href="#" class="nav-link modal-trigger" data-target="modal1" ><span class="icon-user"></span>
                        Ingresar</a></li>
                    @endif
                    
                </ul>
            </div>
        </div>
    </nav>
    <!-- END nav -->

    <div style="padding-top: 50px">
        @yield('content')
    </div>

   	<footer class="ftco-footer ftco-bg-dark ftco-section">
        <div class="container">
            <div class="row mb-5 justify-content-center">
                <div class="col-md-6 col-lg-3">
                    <div class="ftco-footer-widget mb-5">
                        <h2 class="ftco-heading-2">Consultas</h2>
                        <div class="block-23 mb-3">
                            <ul>
                                <li><a href="#"><span class="icon icon-envelope"></span><span
                                            class="text">soporte.kidgame@gmail.com</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="ftco-footer-widget mb-5 ml-md-4">
                        <h2 class="ftco-heading-2">Links</h2>
                        <ul class="list-unstyled">
                            <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>Inicio</a></li>
                            <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>Ahorcado</a></li>
                            <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>Memoria</a></li>
                            <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>Sopa Letra</a></li>
                            <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>Competencia</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="ftco-footer-widget mb-5">
                        <h2 class="ftco-heading-2">Suscribete!</h2>
                        <form action="#" class="subscribe-form">
                            <div class="form-group">
                                <input type="text" class="form-control mb-2 text-center"
                                    placeholder="Ingrese Correo">
                                <input type="submit" value="Suscribir" class="form-control submit px-3">
                            </div>
                        </form>
                    </div>
                    <div class="ftco-footer-widget mb-5">
                        <h2 class="ftco-heading-2 mb-0">Nuestras Redes</h2>
                        <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                            <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                            <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                            <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-center">

                    <p>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                        Copyright &copy;<script>
                        document.write(new Date().getFullYear());
                        </script> All rights reserved | kidgame
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    </p>
                    <p>
                       Desarrollador por:<br>Jorge Campos<br>Karem Chinchay<br>Sergio Delgado<br>Rubén Hernández<br>Noely Moscol<br>Ulises Cangalaya<br>Orlando Ñiquen<br>Franklin Terán
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <div id="modal1" class="modal" style="width: 30%;">
        <div class="modal-content">
            <img src="{{asset('assets\web\img\login.jpg')}}" alt="" style="width: 100%;padding: 0px 150px;">
					
            <button style="background: #606060;position: absolute;opacity: 1;padding: 5px 10px;color: #fff;right: -40px;top: 0;border-radius: 50%;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            
            <h4 style="font-weight: bold;">Inicia sesión en cuestión de segundos</h4>
            <p>Usa tu correo electrónico para continuar con kidgame (gratis).</p>
            
            <a href="{{ url('auth/google') }}"><button style="border: none!important;outline: none;width: 100%;padding: 10px;cursor: pointer;" type="button">
                <span>
                    <span aria-hidden="true" class="NA_Img dkWypw">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="24" width="24">
                            <path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"></path>
                            <path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"></path>
                            <path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"></path>
                            <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"></path>
                        </svg>
                    </span>
                </span>
                <span class="">Continuar con Google</span>
            </button></a>
        </div>
        {{-- <div class="modal-footer">
        </div> --}}
      </div>

	<div class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-md modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-body">
                    
				</div>
			</div>
		</div>
	</div>

    <!-- loader -->
    <div id="ftco-loader" class="show fullscreen"><svg class="circular" width="48px" height="48px">
            <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" />
            <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10"
                stroke="#F96D00" />
        </svg></div>

    <script src="{{asset('template/js/jquery.min.js')}}"></script>
    <script src="{{asset('template/js/jquery-migrate-3.0.1.min.js')}}"></script>
    <script src="{{asset('template/js/popper.min.js')}}"></script>
    <script src="{{asset('template/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('template/js/jquery.easing.1.3.js')}}"></script>
    <script src="{{asset('template/js/jquery.stellar.min.js')}}"></script>
    <script src="{{asset('template/js/owl.carousel.min.js')}}"></script>
    <script src="{{asset('template/js/jquery.waypoints.min.js')}}"></script>
    <script src="{{asset('template/js/jquery.magnific-popup.min.js')}}"></script>
    <script src="{{asset('template/js/jquery.animateNumber.min.js')}}"></script>
    <script src="{{asset('template/js/scrollax.min.js')}}"></script>
    <script src="{{asset('template/js/aos.js')}}"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false">
    </script>
    <script src="{{asset('template/js/google-map.js')}}"></script>
    <script src="{{asset('template/js/main.js')}}"></script>
    <script src="{{asset('materialize/js/materialize.min.js')}}"></script>
    <script src="{{asset('assets/web/main/script.js')}}"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        $('.configuracion-user img').click(function () { 
            if ($('.option-configuracion').hasClass('show-option')) {
                $('.option-configuracion').removeClass('show-option')
            }else{
                
                $('.option-configuracion').addClass('show-option')
            }
         })

         $('.salirCuenta').click(function () {
            localStorage.removeItem('accessToken');
            window.location.href = '/salir'
         })
    </script>
    @if (!Auth::check())
        <script>
             localStorage.removeItem('accessToken');
        </script>
    @endif
    @if (session('accessToken'))
        @php
            $accessToken =session('accessToken');
        @endphp
        <script>
            localStorage.setItem('accessToken',@json($accessToken));
        </script>
    @endif
    @yield('script')
</body>

</html>