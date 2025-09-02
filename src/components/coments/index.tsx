export interface Session {
    time: string;
    title: string;
    type: string;
    speaker: string;
    description: string;
}

export interface DayAgenda {
    date: string;
    theme: string;
    sessions: Session[];
}

export interface AgendaData {
    dia1: DayAgenda;
    dia2: DayAgenda;
    dia3: DayAgenda;
    dia4: DayAgenda;
    dia5: DayAgenda;
}


const agendaData: AgendaData = {
        dia1: {
            date: '12-13 de Setembro de 2025',
            theme: 'Abertura e Visão Estratégica',
            sessions: [
                {
                    time: '08:30 - 09:00',
                    title: 'Leitura e aprovação da Síntese do 1º dia',
                    type: 'Inicio',
                    speaker: 'Secretariado',
                    description: 'Leitura e aprovação da Síntese do 1º dia'
                },
                {
                    time: '09:00 - 10:25',
                    title: 'Painel I: Desafios da Saúde Digital em Moçambique',
                    type: 'Painel',
                    speaker: 'Moderador, Facilitador, Painelistas, S. Excia o Ministro',
                    description: 'Apresentação do painel, Apresentação do tema, Intervenções (3), Moderação do debate'
                },
                {
                    time: '10:25 - 11:05',
                    title: 'Lanche da manhã',
                    type: 'Lunche',
                    speaker: '',
                    description: 'Lanche da manhã'
                },
                {
                    time: '11:05 - 12:55',
                    title: 'Painel II: Prontidão e resiliência aos eventos climáticos extremos na saúde',
                    type: 'Painel',
                    speaker: 'Moderador, Facilitador, Painelistas, S. Excia o Ministro',
                    description: 'Apresentação do painel, Apresentação do tema, Intervenções (3), Moderação do debate'
                },
                {
                    time: '12:55 - 13:10',
                    title: 'Prioridades e acções estratégicas para o PESOE 2025 ',
                    type: 'Painel',
                    speaker: 'DPC',
                    description: 'Prioridades e acções estratégicas para o PESOE 2025 '
                },
                {
                    time: '13:10 - 13:25',
                    title: 'Linhas gerais do PESS 2025-2034',
                    type: 'Linhas gerais',
                    speaker: 'DPC',
                    description: 'Linhas gerais do PESS 2025-2034'
                },
                {
                    time: '13:25 - 13:50',
                    title: 'Discussão',
                    type: 'Discussão',
                    speaker: 'S. Excia o Ministro',
                    description: 'Discussão'
                },
                {
                    time: '13:50 - 14:10',
                    title: 'Gestão de Recursos Humanos - desafios e perspectivas',
                    type: 'Apresentação',
                    speaker: 'DRH',
                    description: 'Gestão de Recursos Humanos - desafios e perspectivas'
                },
                {
                    time: '14:10 - 14:30h',
                    title: 'Discussão ',
                    type: 'Discussão',
                    speaker: 'S. Excia o Ministro',
                    description: 'Discussão'
                },
                {
                    time: '14:30 - 15:30',
                    title: 'Almoço',
                    type: 'Intervalo',
                    speaker: '',
                    description: 'Almoço'
                },
                {
                    time: '15:30 - 15:40',
                    title: 'Momento Cultural',
                    type: 'Momento Cultural',
                    speaker: 'Grupo Cultural',
                    description: 'Momento Cultural'
                },
                {
                    time: '15:40 - 15:55',
                    title: 'Leitura do Comunicado Final',
                    type: 'Apresentação',
                    speaker: 'Secretariado',
                    description: 'Leitura do Comunicado Final'
                },
                {
                    time: '15:55 - 16:05',
                    title: 'Discurso de Encerramento',
                    type: 'Discurso',
                    speaker: 'S. Excia o Ministro',
                    description: 'Discurso de Encerramento do evento'
                },
                {
                    time: '16:05',
                    title: 'Fim do Conselho Coordenador',
                    type: 'Ceremónia de enceramento',
                    speaker: '',
                    description: 'Fim do Conselho Coordenador'
                }
            ]
        },
        dia2: {
            date: '17 de Junho - Terça-feira',
            theme: 'Saúde Infantil e Nutrição',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Seminário: Desnutrição Infantil - Desafios e Soluções',
                    type: 'seminar',
                    speaker: 'Dr. João Mavie - UNICEF',
                    description: 'Estratégias para combater a desnutrição em crianças menores de 5 anos'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:30',
                    title: 'Mesa Redonda: Vacinação e Imunização',
                    type: 'roundtable',
                    speaker: 'Especialistas em Imunização',
                    description: 'Discussão sobre cobertura vacinal e novos programas'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '14:00 - 15:30',
                    title: 'Workshop: Cuidados Neonatais Essenciais',
                    type: 'workshop',
                    speaker: 'Equipe de Pediatria MISAU',
                    description: 'Práticas para redução da mortalidade neonatal'
                },
                {
                    time: '15:30 - 16:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '16:00 - 17:30',
                    title: 'Grupo de Trabalho: Políticas de Nutrição',
                    type: 'workgroup',
                    speaker: 'Coordenadores de Nutrição',
                    description: 'Desenvolvimento de estratégias provinciais de nutrição'
                }
            ]
        },
        dia3: {
            date: '18 de Junho - Quarta-feira',
            theme: 'Saúde Adolescente e Reprodutiva',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Conferência: Saúde Sexual e Reprodutiva dos Adolescentes',
                    type: 'conference',
                    speaker: 'Dra. Ana Macamo - UNFPA',
                    description: 'Abordagem integral da saúde reprodutiva na adolescência'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:30',
                    title: 'Painel: Prevenção de Gravidezes Precoces',
                    type: 'panel',
                    speaker: 'Especialistas em Saúde Reprodutiva',
                    description: 'Estratégias de prevenção e educação sexual'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '14:00 - 15:30',
                    title: 'Workshop: Serviços Amigáveis aos Adolescentes',
                    type: 'workshop',
                    speaker: 'Coordenadores de Saúde Adolescente',
                    description: 'Criação de espaços de atendimento adequados aos jovens'
                },
                {
                    time: '15:30 - 16:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '16:00 - 17:00',
                    title: 'Sessão de Networking',
                    type: 'networking',
                    speaker: '',
                    description: 'Oportunidade para estabelecer parcerias e trocar experiências'
                }
            ]
        },
        dia4: {
            date: '19 de Junho - Quinta-feira',
            theme: 'Fortalecimento do Sistema de Saúde',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Seminário: Recursos Humanos em Saúde',
                    type: 'seminar',
                    speaker: 'Direção de Recursos Humanos MISAU',
                    description: 'Estratégias para formação e retenção de profissionais de saúde'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:30',
                    title: 'Mesa Redonda: Financiamento da Saúde',
                    type: 'roundtable',
                    speaker: 'Parceiros de Desenvolvimento',
                    description: 'Mobilização de recursos e sustentabilidade financeira'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '14:00 - 15:30',
                    title: 'Workshop: Gestão da Cadeia de Abastecimento',
                    type: 'workshop',
                    speaker: 'CMAM - Central de Medicamentos',
                    description: 'Otimização da distribuição de medicamentos e equipamentos'
                },
                {
                    time: '15:30 - 16:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '16:00 - 17:30',
                    title: 'Grupo de Trabalho: Qualidade dos Cuidados',
                    type: 'workgroup',
                    speaker: 'Coordenadores de Qualidade',
                    description: 'Melhoria contínua da qualidade dos serviços de saúde'
                }
            ]
        },
        dia5: {
            date: '20 de Junho - Sexta-feira',
            theme: 'Compromissos e Próximos Passos',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Apresentação de Resultados dos Grupos de Trabalho',
                    type: 'presentation',
                    speaker: 'Coordenadores dos GTs',
                    description: 'Síntese das discussões e recomendações dos grupos'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:00',
                    title: 'Painel: Compromissos 2025-2030',
                    type: 'panel',
                    speaker: 'Liderança MISAU',
                    description: 'Definição de metas e indicadores para os próximos 5 anos'
                },
                {
                    time: '12:00 - 12:30',
                    title: 'Cerimónia de Encerramento',
                    type: 'ceremony',
                    speaker: 'Ministro da Saúde',
                    description: 'Discurso de encerramento e próximos passos'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço de Despedida',
                    type: 'networking',
                    speaker: '',
                    description: 'Networking final e despedidas'
                }
           ]
        }
    };