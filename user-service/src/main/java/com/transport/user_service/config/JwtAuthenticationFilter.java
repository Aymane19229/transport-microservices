package com.transport.user_service.config;

import com.transport.user_service.service.CustomUserDetailsService;
import com.transport.user_service.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. On récupère le header "Authorization" (là où est le token)
        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        // 2. Le token doit commencer par "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7); // On enlève "Bearer " pour garder juste le code
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
                System.out.println("Erreur d'extraction du token : " + e.getMessage());
            }
        }

        // 3. Si on a le username et que l'utilisateur n'est pas encore authentifié dans le contexte
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // 4. On valide le token
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {

                // 5. Tout est bon ! On crée l'objet d'authentification
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 6. On dit à Spring Security : "C'est bon, laisse-le passer, il est identifié"
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 7. On passe à la suite (le Contrôleur)
        filterChain.doFilter(request, response);
    }
}