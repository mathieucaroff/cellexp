// Rule 110 & cellular automaton

// Piece of advice -
//
// For advanced shader editing, use a text editor with syntax highlighting and
// copy-paste to the browser when satified, rather than to do all edits live in
// the browser.

// /!\ Each time, you do so, think to check the shader do compiles

#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D backbuffer;

vec3 zero = vec3(0.);

vec4 blue = vec4(0., 0., 1.,1.);
vec4 cyan = vec4(0., 1., 1.,1.);
vec4 white = vec4(1., 1., 1., 1.);
vec4 black = vec4(0., 0., 0., 1.);

vec4 live = cyan;
vec4 dead = black;

float cut = 0.25;

vec2 pixel = 1. / resolution;

bool mouse_to_the_left = mouse.x < pixel.x; // Put the grid everywhere
bool mouse_to_the_right = mouse.x >= 1.0 - pixel.x; // Put the grid everywhere
bool mouse_to_the_bottom = mouse.y < 4. * pixel.y; // Delete everything
bool mouse_near_the_bottom = !mouse_to_the_bottom && mouse.y < 8. * pixel.y; // Nothing yet
bool mouse_to_the_right_half = mouse.x > 0.5; // Nothing yet
bool mouse_is_above_cut = mouse.y > cut + 3. * pixel; // Stop time

bool exterior(vec2 elem, vec2 limit) {
   return elem.x < 1.0 || limit.x - elem.x <= 1.0 || elem.y < 1.0 || limit.y - elem.y <= 1.0;
}

vec4 retrieveXY(vec2 position, float x, float y) {
   float posx = position.x + pixel.x * x;
   posx = fract(posx);
   return texture2D(backbuffer, vec2(posx, position.y + pixel.y * y));
}

vec4 retrieve(vec2 position, float index) {
   return retrieveXY(position, index, 0.);
}

void main(void) {
   vec2 position = gl_FragCoord.xy * pixel;

   bool near_mouse = length((mouse - position) / pixel) < 6.0;

   bool right_side = position.x + pixel.x >= 1.0;
   bool left_side = position.x < pixel.x;

   if (position.y > cut) {
      vec4 COLOR;
      if (mouse_is_above_cut) {
         COLOR = retrieve(position, 0.);
      } else if (position.y - 2. * pixel.y > cut) {
         vec4 below = retrieveXY(position, 0., -1.);
         COLOR = below;
      } else {
         vec4 live_color = cyan;
         vec4 dead_color = black;

         float righ = retrieve(position,  1.).b;
         float same = retrieve(position,  0.).b;
         float left = retrieve(position, -1.).b;

         // if (left_side) {
         //    left = retrieve(vec2(1. - pixel.x, position.y), 0.).b;
         // }

         // if (right_side) {
         //    righ = retrieve(vec2(0., position.y), 0.).b;
         // }

         // Rule 110
         bool alive = same + righ > 0.1;
         if (righ + same + left > 2.5) {
            // Kill when crowded
            alive = false;
         }

         int kx = int(mod(gl_FragCoord.x, 14.));

         if (alive) {
            float a0 = retrieve(position, -7.).b;
            float a1 = retrieve(position, -6.).b;
            float a2 = retrieve(position, -5.).b;
            float a3 = retrieve(position, -4.).b;
            float a4 = retrieve(position, -3.).b;
            float a5 = retrieve(position, -2.).b;
            float a6 = retrieve(position, -1.).b;
            float a7 = retrieve(position,  0.).b;
            float a8 = retrieve(position,  1.).b;
            float a9 = retrieve(position,  2.).b;
            float aa = retrieve(position,  3.).b;
            float ab = retrieve(position,  4.).b;
            float ac = retrieve(position,  5.).b;
            float ad = retrieve(position,  6.).b;

            float total = a0 + a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + aa + ab + ac + ad;

            // match: whether the grid patter is found
            bool match = true;

            // if (7.9 < total && total < 8.1) {
            //    for (float m = 0; m < 14., m++) {
            //       checkPattern(position, m)
            //    }
            // }

            // if (true) {
            // if (false) {
            if (total < 7.9 || 8.1 < total) {
               bool match = false;
               // skip all
            } else if (a0 * a1 * a2 * a3 * a4 * a8 * ab * ac > .9) {
               live_color.g = 0.4;
            } else if (a1 * a2 * a3 * a4 * a5 * a9 * ac * ad > .9) {
               live_color.g = 0.4;
            } else if (a2 * a3 * a4 * a5 * a6 * aa * ad * a0 > .9) {
               live_color.g = 0.4;
            } else if (a3 * a4 * a5 * a6 * a7 * ab * a0 * a1 > .9) {
               live_color.g = 0.4;
            } else if (a4 * a5 * a6 * a7 * a8 * ac * a1 * a2 > .9) {
               live_color.g = 0.4;
            } else if (a5 * a6 * a7 * a8 * a9 * ad * a2 * a3 > .9) {
               live_color.g = 0.4;
            } else if (a6 * a7 * a8 * a9 * aa * a0 * a3 * a4 > .9) {
               live_color.g = 0.4;
            } else if (a7 * a8 * a9 * aa * ab * a1 * a4 * a5 > .9) {
               live_color.g = 0.4;
            } else if (a8 * a9 * aa * ab * ac * a2 * a5 * a6 > .9) {
               live_color.g = 0.4;
            } else if (a9 * aa * ab * ac * ad * a3 * a6 * a7 > .9) {
               live_color.g = 0.4;
            } else if (aa * ab * ac * ad * a0 * a4 * a7 * a8 > .9) {
               live_color.g = 0.4;
            } else if (ab * ac * ad * a0 * a1 * a5 * a8 * a9 > .9) {
               live_color.g = 0.4;
            } else if (ac * ad * a0 * a1 * a2 * a6 * a9 * aa > .9) {
               live_color.g = 0.4;
            } else if (ad * a0 * a1 * a2 * a3 * a7 * aa * ab > .9) {
               live_color.g = 0.4;
            } else {
               match = false;
            }
         }

         // righ side always alive
         // if (right_side) {
         //    alive = true;
         // }

         if (mouse_to_the_right || near_mouse) {
            float rnd1 = mod(fract(sin(dot(position + time * 0.001, vec2(14.7898,78.233))) * 43758.5453), 1.0);
            live_color *= .7;
            alive = rnd1 > 0.5;
         }

         if (mouse_to_the_left) {
            if (kx < 5 || kx == 8 || kx == 11 || kx == 12) {
               alive = true;
            } else {
               alive = false;
            }
         }

         if (mouse_to_the_bottom) {
            alive = false;
         }

         COLOR = alive ? live_color : dead_color;
      }
      gl_FragColor = COLOR;
      return;
   }


   // if (exterior(gl_FragCoord.xy, resolution)) {
   //    float rnd0 = mod(fract(sin(dot(position, vec2(14.7898,78.233))) * 43758.5453), 1.0);
   //    if (rnd0 > 0.5) {
   //       gl_FragColor = live;
   //    } else {
   //       gl_FragColor = dead;
   //    }
   // } else
   if (near_mouse) {
      float rnd1 = mod(fract(sin(dot(position + time * 0.001, vec2(14.7898,78.233))) * 43758.5453), 1.0);
      if (rnd1 > 0.79) {
         gl_FragColor = live;
      } else {
         gl_FragColor = blue;
      }
   } else {
      float sum = 0.;
      sum += retrieveXY(position, -1., -1.).g;
      sum += retrieveXY(position, -1., 0.).g;
      sum += retrieveXY(position, -1., 1.).g;
      sum += retrieveXY(position, 1., -1.).g;
      sum += retrieveXY(position, 1., 0.).g;
      sum += retrieveXY(position, 1., 1.).g;
      sum += retrieveXY(position, 0., -1.).g;
      sum += retrieveXY(position, 0., 1.).g;
      vec4 me = texture2D(backbuffer, position);

      bool deadenough = me.g <= 0.1;

      if (deadenough) {
         if ((sum >= 2.7) && (sum <= 3.1)) {
            gl_FragColor = live;
         } else if (me.b > 0.004) {
            gl_FragColor = vec4(0., 0., max(me.b - 0.004, 0.25), 0.);
         } else {
            gl_FragColor = dead;
         }
      } else {
         if ((sum >= 1.7) && (sum <= 3.1)) {
            gl_FragColor = live;
         } else {
            gl_FragColor = blue;
         }
      }
   }
}
