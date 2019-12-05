package com.unewej.questengine.config;

import com.unewej.questengine.model.GameEntity;
import com.unewej.questengine.payload.Game;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.stereotype.Component;

@Component
public class OrikaMapper extends ConfigurableMapper {
    @Override
    protected void configure(MapperFactory factory) {
        factory.classMap(GameEntity.class, Game.class)
                .exclude("questions")
                .exclude("gameStatistic")
                .byDefault()
                .register();
    }
}