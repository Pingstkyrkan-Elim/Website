import React from 'react';
import styled, { keyframes } from 'styled-components';

const mapGlow = keyframes`
  0% {
    filter: drop-shadow(0 0 10px rgba(0, 122, 255, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(0, 122, 255, 0.5));
  }
  100% {
    filter: drop-shadow(0 0 10px rgba(0, 122, 255, 0.3));
  }
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
`;

const MapSVG = styled.svg`
  width: 100%;
  height: 100%;
  
  .country {
    fill: rgba(255, 255, 255, 0.02);
    stroke: rgba(255, 255, 255, 0.05);
    stroke-width: 0.5;
    transition: all 0.3s ease;
  }
  
  .mission-country {
    fill: rgba(0, 122, 255, 0.12);
    stroke: rgba(0, 122, 255, 0.3);
    stroke-width: 1;
    animation: ${mapGlow} 4s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(0, 122, 255, 0.4));
  }
  
  .continent {
    fill: rgba(255, 255, 255, 0.01);
    stroke: rgba(255, 255, 255, 0.03);
    stroke-width: 0.3;
  }
`;

const WorldMapBackground: React.FC = () => {
  return (
    <MapContainer>
      <MapSVG viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* World continent outlines */}
        <g id="continents">
          {/* North America */}
          <path className="continent" d="M80,120 Q100,100 150,110 Q200,105 250,120 Q280,130 290,160 Q285,200 270,220 Q250,230 200,235 Q150,232 100,220 Q80,180 80,120Z" />
          
          {/* South America */}
          <path className="continent" d="M220,250 Q240,240 260,250 Q280,270 285,300 Q290,350 280,400 Q270,430 250,440 Q230,435 220,420 Q210,380 215,350 Q218,300 220,250Z" />
          
          {/* Europe */}
          <path className="continent" d="M450,100 Q480,90 520,100 Q550,105 570,120 Q580,140 575,160 Q570,180 550,185 Q520,182 480,175 Q450,165 440,140 Q445,120 450,100Z" />
          
          {/* Africa */}
          <path className="continent" d="M480,180 Q520,170 550,180 Q580,190 590,220 Q595,260 590,300 Q585,340 575,360 Q560,375 540,380 Q520,378 500,370 Q480,360 475,340 Q470,300 475,260 Q478,220 480,180Z" />
          
          {/* Asia */}
          <path className="continent" d="M600,80 Q650,70 720,85 Q800,95 850,120 Q880,140 885,170 Q890,200 880,230 Q870,250 850,260 Q800,265 750,260 Q700,255 650,245 Q600,235 580,210 Q570,180 580,150 Q590,120 600,80Z" />
          
          {/* Australia */}
          <path className="continent" d="M750,320 Q780,310 820,315 Q850,320 860,340 Q865,360 855,375 Q845,385 820,388 Q790,385 760,378 Q740,368 735,350 Q730,332 750,320Z" />
        </g>

        {/* Mission countries highlighted */}
        <g id="mission-countries">
          {/* Kenya - East Africa */}
          <path className="mission-country" d="M540,240 Q560,235 575,245 Q580,255 575,265 Q570,275 555,278 Q540,275 530,265 Q525,255 530,245 Q535,237 540,240Z" />
          
          {/* India - South Asia */}
          <path className="mission-country" d="M720,200 Q750,195 770,210 Q775,225 770,240 Q765,255 745,260 Q725,257 705,245 Q695,230 700,215 Q710,200 720,200Z" />
          
          {/* Guatemala - Central America */}
          <path className="mission-country" d="M200,220 Q215,215 225,225 Q230,235 225,245 Q220,255 205,258 Q190,255 180,245 Q175,235 180,225 Q190,217 200,220Z" />
          
          {/* Philippines - Southeast Asia */}
          <path className="mission-country" d="M820,230 Q835,225 845,235 Q850,245 845,255 Q840,265 825,268 Q810,265 800,255 Q795,245 800,235 Q810,227 820,230Z" />
          
          {/* Brazil - South America */}
          <path className="mission-country" d="M240,300 Q265,295 280,310 Q285,325 280,340 Q275,355 255,360 Q235,357 220,342 Q210,327 215,312 Q225,297 240,300Z" />
          
          {/* Nepal - South Asia */}
          <path className="mission-country" d="M710,180 Q725,175 735,185 Q740,195 735,205 Q730,215 715,218 Q700,215 690,205 Q685,195 690,185 Q700,177 710,180Z" />
        </g>

        {/* Connection lines showing global reach */}
        <g id="connections" opacity="0.3">
          <line x1="400" y1="200" x2="540" y2="240" stroke="rgba(0, 122, 255, 0.4)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="400" y1="200" x2="720" y2="200" stroke="rgba(0, 122, 255, 0.4)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="400" y1="200" x2="200" y2="220" stroke="rgba(0, 122, 255, 0.4)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="400" y1="200" x2="820" y2="230" stroke="rgba(0, 122, 255, 0.4)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="400" y1="200" x2="240" y2="300" stroke="rgba(0, 122, 255, 0.4)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="400" y1="200" x2="710" y2="180" stroke="rgba(0, 122, 255, 0.4)" strokeWidth="1" strokeDasharray="5,5" />
        </g>
      </MapSVG>
    </MapContainer>
  );
};

export default WorldMapBackground;